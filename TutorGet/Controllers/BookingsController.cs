using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using TutorGet.Models;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System.IO;

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
            //var bookings = db.Bookings.Include(b => b.AspNetUser).Include(b => b.Tutor);
            return View(bookLesson);
        }


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
            if (db.Bookings.Any(e => e.BookingTime == booking.BookingTime && e.UserId == booking.UserId))
            {
                ViewBag.TheResult = false;
            }
            else if (ModelState.IsValid)
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
        public ActionResult Edit([Bind(Include = "Id,BookingTime,UserId,TutorId")] Booking booking)
        {

            if (db.Bookings.Any(e => e.BookingTime == booking.BookingTime && e.UserId == booking.UserId))
            {
                ViewBag.TheResult = false;
            }
            else if (ModelState.IsValid)
            {
                db.Entry(booking).State = EntityState.Modified;
                db.SaveChanges();
                ViewBag.TheResult = true;
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


        private List<BlogPieChart> PopulateData()
        {
            var list = new List<BlogPieChart>();
            var userId = User.Identity.GetUserId();
            int en = db.Bookings.Where(b => b.UserId == userId && b.Tutor.Language.LanguageName == "English").Count();
            int ch = db.Bookings.Where(b => b.UserId == userId && b.Tutor.Language.LanguageName == "Chinese").Count();
            int jp = db.Bookings.Where(b => b.UserId == userId && b.Tutor.Language.LanguageName == "Japanese").Count();
            int sp = db.Bookings.Where(b => b.UserId == userId && b.Tutor.Language.LanguageName == "Spanish").Count();
            int fr = db.Bookings.Where(b => b.UserId == userId && b.Tutor.Language.LanguageName == "French").Count();
            int it = db.Bookings.Where(b => b.UserId == userId && b.Tutor.Language.LanguageName == "Italian").Count();
            if (en > 0)
            { list.Add(new BlogPieChart { Language = "English", Count = en }); }
            if (ch > 0)
            { list.Add(new BlogPieChart { Language = "Chinese", Count = ch }); }
            if (jp > 0)
            { list.Add(new BlogPieChart { Language = "Japanese", Count = jp }); }
            if (sp > 0)
            { list.Add(new BlogPieChart { Language = "Spanish", Count = sp }); }
            if (fr > 0)
            { list.Add(new BlogPieChart { Language = "French", Count = fr }); }
            if (it > 0)
            { list.Add(new BlogPieChart { Language = "Italian", Count = it }); }
            return list;
        }

        public JsonResult GetChartData()
        {
            var lessons = PopulateData();
            var chartData = new object[lessons.Count + 1];
            chartData[0] = new object[]
            {
                "Language",
                "Count"
            };
            int j = 0;
            foreach (var i in lessons)
            {
                j++;
                chartData[j] = new object[] { i.Language, i.Count };
            }
            return new JsonResult { Data = chartData, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        [Authorize]
        public ActionResult Report()
        {
            return View();
        }

        private List<BlogLineChart> monthLine()
        {
            var list = new List<BlogLineChart>();
            var userId = User.Identity.GetUserId();
            int jan = db.Bookings.Where(b => b.UserId == userId && b.BookingTime.Month == 1).Count();
            int feb = db.Bookings.Where(b => b.UserId == userId && b.BookingTime.Month == 2).Count();
            int mar = db.Bookings.Where(b => b.UserId == userId && b.BookingTime.Month == 3).Count();
            int apr = db.Bookings.Where(b => b.UserId == userId && b.BookingTime.Month == 4).Count();
            int may = db.Bookings.Where(b => b.UserId == userId && b.BookingTime.Month == 5).Count();
            int jun = db.Bookings.Where(b => b.UserId == userId && b.BookingTime.Month == 6).Count();
            int jul = db.Bookings.Where(b => b.UserId == userId && b.BookingTime.Month == 7).Count();
            int aug = db.Bookings.Where(b => b.UserId == userId && b.BookingTime.Month == 8).Count();
            int sep = db.Bookings.Where(b => b.UserId == userId && b.BookingTime.Month == 9).Count();
            int oct = db.Bookings.Where(b => b.UserId == userId && b.BookingTime.Month == 10).Count();
            int nov = db.Bookings.Where(b => b.UserId == userId && b.BookingTime.Month == 11).Count();
            int dec = db.Bookings.Where(b => b.UserId == userId && b.BookingTime.Month == 12).Count();
            list.Add(new BlogLineChart { Month = "01", Count = jan }); 
            list.Add(new BlogLineChart { Month = "02", Count = feb });
            list.Add(new BlogLineChart { Month = "03", Count = mar });
            list.Add(new BlogLineChart { Month = "04", Count = apr });
            list.Add(new BlogLineChart { Month = "05", Count = may });
            list.Add(new BlogLineChart { Month = "06", Count = jun });
            list.Add(new BlogLineChart { Month = "07", Count = jul });
            list.Add(new BlogLineChart { Month = "08", Count = aug });
            list.Add(new BlogLineChart { Month = "09", Count = sep });
            list.Add(new BlogLineChart { Month = "10", Count = oct });
            list.Add(new BlogLineChart { Month = "11", Count = nov });
            list.Add(new BlogLineChart { Month = "12", Count = dec });
            
            return list;
        }

        public JsonResult GetLineData()
        {
            var months = monthLine();
            var chartData = new object[months.Count + 1];
            chartData[0] = new object[]
            {
                "Month",
                "Lessons"
            };
            int j = 0;
            foreach (var i in months)
            {
                j++;
                chartData[j] = new object[] { i.Month, i.Count };
            }
            return new JsonResult { Data = chartData, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }


    }

}

