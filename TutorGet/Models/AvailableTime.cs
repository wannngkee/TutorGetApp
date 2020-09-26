namespace TutorGet.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class AvailableTime
    {
        public int Id { get; set; }

        public DateTime Available { get; set; }

        public int TutorId { get; set; }

        public virtual Tutor Tutor { get; set; }
    }
}
