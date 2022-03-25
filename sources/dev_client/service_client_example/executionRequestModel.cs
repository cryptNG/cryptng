using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace app
{

    //used for execution request to service api
    public class executionRequestModel
    {
        public string xmlData { get; set; }
        public string xslData { get; set; }

        public UInt64 tokenId { get; set; }

        public UInt64 ticketId { get; set; }

        public string clientSecret { get; set; }

    }

}
