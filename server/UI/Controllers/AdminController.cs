using Microsoft.AspNetCore.Mvc;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdminController : ControllerBase
    {
        [HttpPost]
        public IActionResult IsAdministrator([FromBody] Credentials credentials)
        {
            // Replace this with your logic to check if the credentials match the administrator
            bool isAdmin = credentials.Username == "Iska" && credentials.Password == "1234";
            return Ok(isAdmin);
        }
    }

    public class Credentials
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
