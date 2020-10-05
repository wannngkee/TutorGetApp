using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using TutorGet.Models;

namespace TutorGet.Controllers
{
    public class UserEventsController : Controller
    {
        private aspnetTutorGetEntities db = new aspnetTutorGetEntities();

        // GET: UserEvents
        [Authorize]
        public ActionResult Index()
        {
            var userId = User.Identity.GetUserId();
            var userEvents = db.UserEvents.Where(s => s.UserId == userId).ToList();

            return View(userEvents);
        }

        // GET: UserEvents/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UserEvent userEvent = db.UserEvents.Find(id);
            if (userEvent == null)
            {
                return HttpNotFound();
            }
            return View(userEvent);
        }

        // GET: UserEvents/Create
        [Authorize]
        public ActionResult Create(int eventid)
        {
            //ViewBag.EventId = new SelectList(db.Events, "Id", "EventName", eventid);
            ViewBag.Event = from eve in db.Events
                             where eve.Id == eventid
                             select eve;
            return View();
        }

        // POST: UserEvents/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize]
        public ActionResult Create([Bind(Include = "Id,UserId,EventId")] UserEvent userEvent)
        {
            userEvent.UserId = User.Identity.GetUserId();
            ModelState.Clear();
            TryValidateModel(userEvent);

            if (db.UserEvents.Any(e => e.EventId == userEvent.EventId && e.UserId == userEvent.UserId))
            {
                ViewBag.TheResult = false;
            }

            else if (ModelState.IsValid)
            {
                db.UserEvents.Add(userEvent);
                db.SaveChanges();
                ViewBag.TheResult = true;
                //return RedirectToAction("Index");
            }

            return View(userEvent);
        }

        // GET: UserEvents/Edit/5
        [Authorize]
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UserEvent userEvent = db.UserEvents.Find(id);
            if (userEvent == null)
            {
                return HttpNotFound();
            }
            return View(userEvent);
        }

        // POST: UserEvents/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,UserId,EventId")] UserEvent userEvent)
        {
            if (ModelState.IsValid)
            {
                db.Entry(userEvent).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(userEvent);
        }

        // GET: UserEvents/Delete/5
        [Authorize]
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UserEvent userEvent = db.UserEvents.Find(id);
            if (userEvent == null)
            {
                return HttpNotFound();
            }
            return View(userEvent);
        }

        // POST: UserEvents/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            UserEvent userEvent = db.UserEvents.Find(id);
            db.UserEvents.Remove(userEvent);
            db.SaveChanges();
            ViewBag.TheResult = true;
            //return RedirectToAction("Index");
            return View(userEvent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
