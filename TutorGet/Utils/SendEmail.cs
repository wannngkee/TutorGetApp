using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using TutorGet.Models;

namespace TutorGet.Utils
{

    public class SendEmail
    {
        // Please use your API KEY here.
        private const String API_KEY = "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";

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



        public void SendBunkAtt(List<string>emails, string filename, string content)
        {
           // var api = "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";
            var client = new SendGridClient(API_KEY);
            var from = new EmailAddress("wannngkee@gmail.com", "TutorGet");
            var tos = new List<EmailAddress>();            
            foreach (var email in emails)
            {
                 tos.Add(new EmailAddress(email, ""));
            }
            var subject = "TutorGet-Recent Events";
            var plaintextcontent = "Check out recent language exchange events on TutorGet!";
            var htmlcontent = "<p>Check out recent language exchange events on TutorGet!</p>";
            var showAllRecipients = false;
            var msg = MailHelper.CreateSingleEmailToMultipleRecipients(from, tos, subject, plaintextcontent, htmlcontent, showAllRecipients);
            msg.AddAttachment(filename, content);
            var response = client.SendEmailAsync(msg);
        }

    }
}
