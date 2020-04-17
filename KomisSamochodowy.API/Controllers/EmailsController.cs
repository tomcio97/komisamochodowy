using System;
using System.Threading.Tasks;
using KomisSamochodowy.API.Dtos;
using KomisSamochodowy.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace KomisSamochodowy.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailsController : ControllerBase
    {
        private readonly IEmailService emailService;
        public EmailsController(IEmailService emailService)
        {
            this.emailService = emailService;

        }

        [HttpPost]
        public async Task<IActionResult> SendMail(MailForSendingDto mail)
        {
            if(mail.email !=null && mail.subject !=null && mail.message != null)
            {
            await emailService.SendEmail(mail.email, mail.subject, mail.message);
            return Ok();
            }

            return BadRequest("Błąd");
        }
    }
}