using Microsoft.AspNet.Identity;
using Microsoft.Security.Application;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using TutorGet.Models;
using TutorGet.Utils;

namespace TutorGet.Controllers
{
    public class TutorsController : Controller
    {
        private aspnetTutorGetEntities db = new aspnetTutorGetEntities();

        // GET: Tutors
        [Authorize]
        public ActionResult Search ()
        {
            //var tutors = db.Tutors.Include(t => t.Language);
           
            return View();
        }

        public ActionResult Index(int languageId, string language)
        {
            var tutors = db.Tutors.Where(t => t.Language.Id == languageId && t.Language.LanguageName == language);
            //var tutors = db.Tutors.Include(t => t.Language);
            return View(tutors.ToList());
        }

        // GET: Tutors/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tutor tutor = db.Tutors.Find(id);
            if (tutor == null)
            {
                return HttpNotFound();
            }
            return View(tutor);
        }

        // GET: Tutors/Create
        [Authorize(Roles = "admin")]
        public ActionResult Create()
        {
            ViewBag.LanguageId = new SelectList(db.Languages, "Id", "LanguageName");
            return View();
        }

        // POST: Tutors/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,Name,Experience,HourlyPrice,Rate,Email,LanguageId")] Tutor tutor)
        {
            if (ModelState.IsValid)
            {
                db.Tutors.Add(tutor);
                db.SaveChanges();
                ViewBag.TheResult = true;
                //return RedirectToAction("Index");
            }

            ViewBag.LanguageId = new SelectList(db.Languages, "Id", "LanguageName", tutor.LanguageId);
            return View(tutor);
        }

        // GET: Tutors/Edit/5
        [Authorize(Roles = "admin")]
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tutor tutor = db.Tutors.Find(id);
            if (tutor == null)
            {
                return HttpNotFound();
            }
            ViewBag.LanguageId = new SelectList(db.Languages, "Id", "LanguageName", tutor.LanguageId);
            return View(tutor);
        }

        // POST: Tutors/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,Name,Experience,HourlyPrice,Rate,Email,LanguageId")] Tutor tutor)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tutor).State = EntityState.Modified;
                db.SaveChanges();
                ViewBag.TheResult = true;
                //return RedirectToAction("Index");
            }
            ViewBag.LanguageId = new SelectList(db.Languages, "Id", "LanguageName", tutor.LanguageId);
            return View(tutor);
        }

        // GET: Tutors/Delete/5
        [Authorize(Roles = "admin")]
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tutor tutor = db.Tutors.Find(id);
            if (tutor == null)
            {
                return HttpNotFound();
            }
            return View(tutor);
        }

        // POST: Tutors/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Tutor tutor = db.Tutors.Find(id);
            db.Tutors.Remove(tutor);
            db.SaveChanges();
            ViewBag.TheResult = true;
            //return RedirectToAction("Index");
            return View(tutor);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        public ActionResult Send_Email(int id)
        {
            ViewBag.ToEmail = new SelectList(db.Tutors, "Id", "Email", id);
            var userId = User.Identity.GetUserId();
            var user = db.AspNetUsers.Find(userId);
            return View(new SendEmailViewModel());
        }

        [HttpPost]
        public ActionResult Send_Email(SendEmailViewModel model, int id)
        {
            //ViewBag.ToEmail = new SelectList(db.Tutors, "Id", "Email", id);
            var tutor = db.Tutors.Find(id);
            var tutoremail = tutor.Email;
            var userId = User.Identity.GetUserId();
            var user = db.AspNetUsers.Find(userId);
            var userEmail = user.Email;
            if (ModelState.IsValid)
            {
                try
                {
                    String toEmail = tutoremail;
                    String subject = "Message from user: " + userEmail;
                    String contents = Sanitizer.GetSafeHtmlFragment(model.Contents);

                    SendEmail se = new SendEmail();
                    se.Send(toEmail, subject, contents);

                    ViewBag.Result = "Email has been sent successfully.";

                    ModelState.Clear();

                    return View();
                }
                catch
                {
                    return View();
                }
            }

            return View();
        }


    }
}
