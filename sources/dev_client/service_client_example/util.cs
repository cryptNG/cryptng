using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace app
{
    public static class util
    {
        public static byte[] createHashFromByteArray(byte[] data) => createSha256(data);

        public static byte[] createSha256(byte[] bin) => SHA256.Create().ComputeHash(bin);


    }
}
