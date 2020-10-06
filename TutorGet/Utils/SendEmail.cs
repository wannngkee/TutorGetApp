using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TutorGet.Utils
{

        public class SendEmail
        {
            // Please use your API KEY here.
            private const String API_KEY = "SG.BlfnApWLRJeskSd7T37sGA.BauMT2GGReBV97JKWGNt06ywIZa2BtWsGskggGnM5gk";

            public void Send(String toEmail, String subject, String contents)
            {
                var client = new SendGridClient(API_KEY);
                var from = new EmailAddress("wannngkee@gmail.com", "TutorGet");
                var to = new EmailAddress(toEmail, "");
                var plainTextContent = contents;
                var htmlContent = "<p>" + contents + "</p>";
                var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
                var response = client.SendEmailAsync(msg);
            }

        }
    }
