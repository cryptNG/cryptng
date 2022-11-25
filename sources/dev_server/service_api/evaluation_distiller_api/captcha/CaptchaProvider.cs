

using Microsoft.AspNetCore.DataProtection;
using Microsoft.Maui.Graphics;
using Microsoft.Maui.Graphics.Skia;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace evaluation_distiller_api.captcha
{
    public static class CaptchaProvider
    {
        public static bool CheckCaptchaResult(HttpContext context, string userInput, string captchaSecret)
        {
            Aes myAes = Aes.Create();
            using (SHA256 mySHA256 = SHA256.Create())
            {
                myAes.Key = mySHA256.ComputeHash(Encoding.Default.GetBytes("my - secret"));
            }
            byte[] enciv = Convert.FromBase64String(captchaSecret);

            byte[] enc = enciv.Take(enciv.Length - 16).ToArray();

            myAes.IV = enciv.TakeLast(16).ToArray();

            int solution = Convert.ToInt32(DecryptStringFromBytes_Aes(enc, myAes.Key, myAes.IV));

            return solution == Convert.ToInt32(userInput);


        }
        public static (byte[] img, byte[] enc) GenerateCaptchaImageAsByteArray(HttpContext context)
        {

            Random ran = new Random(Convert.ToInt32(DateTime.Now.Ticks % int.MaxValue) - 1894);
            int[] calculation = new int[] { ran.Next(10, 20), ran.Next(0, 1), ran.Next(0, 10) };
            int solution = calculation[0] + calculation[2] * (calculation[1] == 0 ? -1 : 1);
            context.Session.SetInt32("CaptchaSolution", solution);
            Aes myAes = Aes.Create();
            using (SHA256 mySHA256 = SHA256.Create())
            {
                myAes.Key = mySHA256.ComputeHash(Encoding.Default.GetBytes("my - secret"));
            }
            byte[] encrypted = EncryptStringToBytes_Aes(solution.ToString(), myAes.Key, myAes.IV);
            IEnumerable<byte> enciv = encrypted.Concat(myAes.IV);
            string calcText = calculation[0] + (calculation[1] == 0 ? " - " : " + ") + calculation[2];
            Font def = new Font("Arial", 12);

            SkiaBitmapExportContext bmp = new(600, 400, 1.0f);
            ICanvas canvas = bmp.Canvas;

            Rect backgroundRectangle = new(0, 0, bmp.Width, bmp.Height);
            canvas.FillColor = Color.FromArgb("#003366");
            canvas.FillRectangle(backgroundRectangle);
            canvas.StrokeColor = Colors.Black;
            canvas.StrokeSize = 20;
            canvas.DrawRectangle(backgroundRectangle);

            // Draw circles randomly around the image
            for (int i = 0; i < 100; i++)
            {
                float x = Random.Shared.Next(bmp.Width);
                float y = Random.Shared.Next(bmp.Height);
                float r = Random.Shared.Next(5, 50);

                Color randomColor = Color.FromRgb(
                    red: Random.Shared.Next(255),
                    green: Random.Shared.Next(255),
                    blue: Random.Shared.Next(255));

                canvas.StrokeSize = r / 3;
                canvas.StrokeColor = randomColor.WithAlpha(.3f);
                canvas.DrawCircle(x, y, r);
            }

            // Measure a string
            Font myFont = new Font("Impact");
            float myFontSize = 48;
            canvas.Font = myFont;
            SizeF textSize = canvas.GetStringSize(calcText, myFont, myFontSize);

            // Draw a rectangle to hold the string
            Point point = new(
                x: (bmp.Width - textSize.Width) / 2,
                y: (bmp.Height - textSize.Height) / 2);
            Rect myTextRectangle = new(point, textSize);
            canvas.FillColor = Colors.Black.WithAlpha(.5f);
            canvas.FillRectangle(myTextRectangle);
            canvas.StrokeSize = 2;
            canvas.StrokeColor = Colors.Yellow;
            canvas.DrawRectangle(myTextRectangle);

            // Daw the string itself
            canvas.FontSize = myFontSize * .9f; // smaller than the rectangle
            canvas.FontColor = Colors.White;
            canvas.DrawString(calcText, myTextRectangle,
                HorizontalAlignment.Center, VerticalAlignment.Center, TextFlow.OverflowBounds);

            MemoryStream output = new MemoryStream();
            bmp.WriteToStream(output);
            return (output.ToArray(), enciv.ToArray());
        }

        static byte[] EncryptStringToBytes_Aes(string plainText, byte[] Key, byte[] IV)
        {
            // Check arguments.
            if (plainText == null || plainText.Length <= 0)
                throw new ArgumentNullException("plainText");
            if (Key == null || Key.Length <= 0)
                throw new ArgumentNullException("Key");
            if (IV == null || IV.Length <= 0)
                throw new ArgumentNullException("IV");
            byte[] encrypted;

            // Create an Aes object
            // with the specified key and IV.
            using (Aes aesAlg = Aes.Create())
            {
                aesAlg.Key = Key;
                aesAlg.IV = IV;

                // Create an encryptor to perform the stream transform.
                ICryptoTransform encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);

                // Create the streams used for encryption.
                using (MemoryStream msEncrypt = new MemoryStream())
                {
                    using (CryptoStream csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                    {
                        using (StreamWriter swEncrypt = new StreamWriter(csEncrypt))
                        {
                            //Write all data to the stream.
                            swEncrypt.Write(plainText);
                        }
                        encrypted = msEncrypt.ToArray();
                    }
                }
            }

            // Return the encrypted bytes from the memory stream.
            return encrypted;
        }

        static string DecryptStringFromBytes_Aes(byte[] cipherText, byte[] Key, byte[] IV)
        {
            // Check arguments.
            if (cipherText == null || cipherText.Length <= 0)
                throw new ArgumentNullException("cipherText");
            if (Key == null || Key.Length <= 0)
                throw new ArgumentNullException("Key");
            if (IV == null || IV.Length <= 0)
                throw new ArgumentNullException("IV");

            // Declare the string used to hold
            // the decrypted text.
            string plaintext = null;

            // Create an Aes object
            // with the specified key and IV.
            using (Aes aesAlg = Aes.Create())
            {
                aesAlg.Key = Key;
                aesAlg.IV = IV;

                // Create a decryptor to perform the stream transform.
                ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);

                // Create the streams used for decryption.
                using (MemoryStream msDecrypt = new MemoryStream(cipherText))
                {
                    using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                    {
                        using (StreamReader srDecrypt = new StreamReader(csDecrypt))
                        {

                            // Read the decrypted bytes from the decrypting stream
                            // and place them in a string.
                            plaintext = srDecrypt.ReadToEnd();
                        }
                    }
                }
            }

            return plaintext;
        }
    }
}

