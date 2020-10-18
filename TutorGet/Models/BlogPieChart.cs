using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TutorGet.Models
{
    public class BlogPieChart
    {
        public string Language { get; set; }
        public int Count { get; set; }
    }

    public class BlogLineChart
    {
        public string Month { get; set; }
        public int Count { get; set; }
    }
}