namespace TutorGet.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Event
    {
        public int Id { get; set; }

        [Required]
        public string EventName { get; set; }

        [Required]
        public string Description { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd/MM/yy HH:mm}", ApplyFormatInEditMode = true)]
        [DataType(DataType.DateTime)]
        public DateTime Time { get; set; }

        [Required]
        public string Address { get; set; }

        [Column(TypeName = "numeric")]
        public decimal Latitude { get; set; }

        [Column(TypeName = "numeric")]
        public decimal Longitude { get; set; }
    }
}
