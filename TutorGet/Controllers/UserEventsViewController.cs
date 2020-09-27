using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TutorGet.Controllers
{
    public class UserEventsViewController : Controller
    {
        // GET: UserEventsView
        public ActionResult Index()
        {
            return View();
        }

        // GET: UserEventsView/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: UserEventsView/Create
        public ActionResult Create()
        {
            
            return View();
        }

        // POST: UserEventsView/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: UserEventsView/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: UserEventsView/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: UserEventsView/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: UserEventsView/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
