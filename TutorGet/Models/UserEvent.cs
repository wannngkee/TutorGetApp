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
    
    public partial class UserEvent
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int EventId { get; set; }
    
        public virtual AspNetUser AspNetUser { get; set; }
        public virtual Event Event { get; set; }
    }
}
