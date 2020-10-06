using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TutorGet.Models
{
        public class SendEmailViewModel
        {
            [Display(Name = "Email address")]
            public string ToEmail { get; set; }

            public string Subject { get; set; }

            [Required]
            public string Contents { get; set; }

        }

}