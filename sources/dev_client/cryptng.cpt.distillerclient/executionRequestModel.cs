using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CryptNg.CPT.DistillerClient
{

    //used for execution request to service api
    internal class executionRequestModel
    {
        public string xmlData { get; set; }
        public string xslData { get; set; }
    }

}
