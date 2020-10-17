using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;
using TutorGet.Models;
using TutorGet.Utils;

namespace TutorGet.Controllers
{
    public class UsersController : Controller
    {
        private aspnetTutorGetEntities db = new aspnetTutorGetEntities();

        // GET: Users
        [Authorize(Roles = "admin")]
        public ActionResult Index()
        {
            return View(db.AspNetUsers.ToList());
        }

        // GET: Users/Details/5
        [Authorize]
        public ActionResult Details()//string id
        {
            string userId = User.Identity.GetUserId();
            //if (id == null)
            //{
            //   return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            //}

            AspNetUser aspNetUser = db.AspNetUsers.Find(userId);
            if (aspNetUser == null)
            {
                return HttpNotFound();
            }
            return View(aspNetUser);
        }

        // GET: Users/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Users/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,Email,EmailConfirmed,PasswordHash,SecurityStamp,PhoneNumber,PhoneNumberConfirmed,TwoFactorEnabled,LockoutEndDateUtc,LockoutEnabled,AccessFailedCount,UserName,Address")] AspNetUser aspNetUser)
        {
            if (ModelState.IsValid)
            {
                db.AspNetUsers.Add(aspNetUser);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(aspNetUser);
        }

        // GET: Users/Edit/5
        [Authorize]
        public ActionResult Edit()
        {
            string userId = User.Identity.GetUserId();

            //if (id == null)
            //{
            //    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            //}
            AspNetUser aspNetUser = db.AspNetUsers.Find(userId);
            if (aspNetUser == null)
            {
                return HttpNotFound();
            }
            return View(aspNetUser);
        }

        // POST: Users/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize]
        public ActionResult Edit([Bind(Include = "Id,Email,EmailConfirmed,PasswordHash,SecurityStamp,PhoneNumber,PhoneNumberConfirmed,TwoFactorEnabled,LockoutEndDateUtc,LockoutEnabled,AccessFailedCount,UserName,Address")] AspNetUser aspNetUser)
        {
            if (ModelState.IsValid)
            {
                db.Entry(aspNetUser).State = EntityState.Modified;
                db.SaveChanges();
                ViewBag.TheResult = true;
            }
            return View(aspNetUser);
        }

        // GET: Users/Delete/5
        [Authorize(Roles = "admin")]
        public ActionResult Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            AspNetUser aspNetUser = db.AspNetUsers.Find(id);
            if (aspNetUser == null)
            {
                return HttpNotFound();
            }
            return View(aspNetUser);
        }

        // POST: Users/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "admin")]
        public ActionResult DeleteConfirmed(string id)
        {
            AspNetUser aspNetUser = db.AspNetUsers.Find(id);
            db.AspNetUsers.Remove(aspNetUser);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        [Authorize(Roles = "admin")]
        public ActionResult EmailUser()
        {
            return View();
        }

        [HttpPost]
        public ActionResult EmailUser(HttpPostedFileBase uploadFile)
        {   
            var userId = User.Identity.GetUserId();
            var userList = db.AspNetUsers.ToList();
            var emails = new List<String>();
            foreach (var user in userList)
            {
                if (user.Id != userId)
                {
                    String email = user.Email;
                    emails.Add(email);
                }
            }
            string fileExtension = Path.GetExtension(uploadFile.FileName).ToLower();
            if (fileExtension != ".pdf")
            {
                ViewBag.Alert = "Only pdf file is accepted.";
                return View();
            }
            else 
            {
                if (uploadFile != null & uploadFile.ContentLength > 0)
                {
                    var filename = Path.GetFileName(uploadFile.FileName);
                    byte[] fileInBytes = new byte[uploadFile.ContentLength];
                    using (BinaryReader reader = new BinaryReader(uploadFile.InputStream))
                    {
                        fileInBytes = reader.ReadBytes(uploadFile.ContentLength);
                    }
                    string content = Convert.ToBase64String(fileInBytes);
                    SendEmail se = new SendEmail();
                    se.SendBunkAtt(emails, filename, content);
                    ViewBag.Result = "Promotion email has been send to all the users.";
                    ModelState.Clear();
                    return View();
                }
                return View();
            }
        }

    }
}

