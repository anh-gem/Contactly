﻿namespace Contactly.Models.Domain
{
    public class Contact
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public required string PhoneNumber { get; set; }
        public bool Favorite {  get; set; }
    }
}
