//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TutorGet.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public partial class Event
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Event()
        {
            this.UserEvents = new HashSet<UserEvent>();
        }
    
        public int Id { get; set; }

        [Required]
        [Display(Name = "Event")]
        [RegularExpression(@"[a-zA-Z]+$", ErrorMessage = "Invalid name")]
        public string EventName { get; set; }
        [Required]
        public string Description { get; set; }
        [DisplayFormat(DataFormatString = "{0:dd/MM/yy HH:mm}", ApplyFormatInEditMode = true)]
        [DataType(DataType.DateTime)]
        public System.DateTime Time { get; set; }
        [Required]
        [RegularExpression(@"^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$", ErrorMessage = "Invalid address")]
        public string Address { get; set; }
        [Required]
        public decimal Latitude { get; set; }
        [Required]
        public decimal Longitude { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UserEvent> UserEvents { get; set; }
    }
}
