namespace TutorGet.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class TutorGetModel : DbContext
    {
        public TutorGetModel()
            : base("name=aspnetTutorGet")
        {
        }

        public virtual DbSet<AspNetRole> AspNetRoles { get; set; }
        public virtual DbSet<AspNetUser> AspNetUsers { get; set; }
        public virtual DbSet<AvailableTime> AvailableTimes { get; set; }
        public virtual DbSet<Booking> Bookings { get; set; }
        public virtual DbSet<Event> Events { get; set; }
        public virtual DbSet<Language> Languages { get; set; }
        public virtual DbSet<Tutor> Tutors { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AspNetRole>()
                .HasMany(e => e.AspNetUsers)
                .WithMany(e => e.AspNetRoles)
                .Map(m => m.ToTable("AspNetUserRoles").MapLeftKey("RoleId").MapRightKey("UserId"));

            modelBuilder.Entity<AspNetUser>()
                .HasMany(e => e.Bookings)
                .WithRequired(e => e.AspNetUser)
                .HasForeignKey(e => e.UserId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Event>()
                .Property(e => e.Latitude)
                .HasPrecision(10, 8);

            modelBuilder.Entity<Event>()
                .Property(e => e.Longitude)
                .HasPrecision(11, 8);

            modelBuilder.Entity<Language>()
                .HasMany(e => e.Tutors)
                .WithRequired(e => e.Language)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Tutor>()
                .HasMany(e => e.AvailableTimes)
                .WithRequired(e => e.Tutor)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Tutor>()
                .HasMany(e => e.Bookings)
                .WithRequired(e => e.Tutor)
                .WillCascadeOnDelete(false);
        }
    }
}
