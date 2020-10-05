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
    public class BookingsController : Controller
    {
        private aspnetTutorGetEntities db = new aspnetTutorGetEntities();

        // GET: Bookings
        [Authorize]
        public ActionResult Index()
        {
            var userId = User.Identity.GetUserId();
            var bookLesson = db.Bookings.Where(s => s.UserId == userId).ToList();
            var bookings = db.Bookings.Include(b => b.AspNetUser).Include(b => b.Tutor);
            return View(bookLesson);
        }

        //public JsonResult GetBookings()
        //{
        //   using (aspnetTutorGetEntities dc = new aspnetTutorGetEntities())
        //    {
        //        var bookings = dc.Bookings.ToList();
        //        return new JsonResult { Data = bookings, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        //    }
        //}

        // GET: Bookings/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Booking booking = db.Bookings.Find(id);
            if (booking == null)
            {
                return HttpNotFound();
            }
            return View(booking);
        }

        // GET: Bookings/Create
        [Authorize]
        public ActionResult Create(int tutorid)
        {
            ViewBag.TutorId = new SelectList(db.Tutors, "Id", "Name", tutorid);                           

            //if (null == date)
            //    return RedirectToAction("Index");
            //Booking b = new Booking();
            //DateTime convertedDate = DateTime.Parse(date);
            //b.BookingTime = convertedDate;
            //return  View(b);
            return View();
        }

        // POST: Bookings/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize]
        public ActionResult Create([Bind(Include = "Id,BookingTime,UserId,TutorId")] Booking booking)
        {
            booking.UserId = User.Identity.GetUserId();
            ModelState.Clear();
            TryValidateModel(booking);
            if (ModelState.IsValid)
            {
                db.Bookings.Add(booking);
                db.SaveChanges();
                ViewBag.TheResult = true;
                //return RedirectToAction("Index");
            }

            ViewBag.UserId = new SelectList(db.AspNetUsers, "Id", "Email", booking.UserId);
            ViewBag.TutorId = new SelectList(db.Tutors, "Id", "Name", booking.TutorId);
            return View(booking);
        }

        // GET: Bookings/Edit/5
        [Authorize]
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Booking booking = db.Bookings.Find(id);
            if (booking == null)
            {
                return HttpNotFound();
            }
            ViewBag.UserId = new SelectList(db.AspNetUsers, "Id", "Email", booking.UserId);
            ViewBag.TutorId = new SelectList(db.Tutors, "Id", "Name", booking.TutorId);
            return View(booking);
        }

        // POST: Bookings/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize]
        public ActionResult Edit([Bind(Include = "Id,DateTime,UserId,TutorId")] Booking booking)
        {    
            if (ModelState.IsValid)
            {
                db.Entry(booking).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.UserId = new SelectList(db.AspNetUsers, "Id", "Email", booking.UserId);
            ViewBag.TutorId = new SelectList(db.Tutors, "Id", "Name", booking.TutorId);
            return View(booking);
        }

        // GET: Bookings/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Booking booking = db.Bookings.Find(id);
            if (booking == null)
            {
                return HttpNotFound();
            }
            return View(booking);
        }

        // POST: Bookings/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Booking booking = db.Bookings.Find(id);
            db.Bookings.Remove(booking);
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
    }
}
