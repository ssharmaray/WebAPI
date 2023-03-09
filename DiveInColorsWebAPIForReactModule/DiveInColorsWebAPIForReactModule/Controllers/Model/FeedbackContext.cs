using Microsoft.EntityFrameworkCore;

namespace DiveInColorsWebAPIForReactModule.Controllers.Model
{
    public class FeedbackContext :DbContext
    {
        public FeedbackContext(DbContextOptions<FeedbackContext> options) : base(options)
        {

        }
        public DbSet<Feedback> Feedbacks { get; set; }
    }
}
