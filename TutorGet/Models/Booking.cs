namespace TutorGet.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Booking
    {
        public int Id { get; set; }

        [Required]
        public string DateTime { get; set; }

        [Required]
        [StringLength(128)]
        public string UserId { get; set; }

        public int TutorId { get; set; }

        public virtual AspNetUser AspNetUser { get; set; }

        public virtual Tutor Tutor { get; set; }
    }
}
