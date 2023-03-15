using DiveInColorsWebAPIForReactModule.Controllers.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DiveInColorsWebAPIForReactModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly FeedbackContext _feedbackContext;
        public FeedbackController(FeedbackContext feedbackContext)
        {
            _feedbackContext = feedbackContext; 
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetFeedback()
        {
            if (_feedbackContext.Feedbacks == null)
            {
                return NotFound();
            }
            return await _feedbackContext.Feedbacks.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Feedback>> GetFeedback(int id)
        {
            if (_feedbackContext.Feedbacks == null)
            {
                return NotFound();
            }
            var feedback = await _feedbackContext.Feedbacks.FindAsync(id);
            if (feedback == null)
            {
                return NotFound();
            }
            return feedback;
        }

        [HttpPost]
        public async Task<ActionResult<Feedback>> PostFeedback(Feedback feedback)
        {
            _feedbackContext.Feedbacks.Add(feedback);
            await _feedbackContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEmployee), new { id = feedback.ID }, feedback);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Feedback>> PutEmployee(int id, Feedback feedback)
        {
            if (id != feedback.ID)
            {
                return BadRequest();
            }

            _feedbackContext.Entry(feedback).State = EntityState.Modified;
            try
            {
                await _feedbackContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Feedback>> DeleteFeedback(int id)
        {
            if (_feedbackContext.Feedbacks == null)
            {
                return NotFound();
            }
            var employee = await _feedbackContext.Feedbacks.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            _feedbackContext.Feedbacks.Remove(employee);
            await _feedbackContext.SaveChangesAsync();
            return Ok();
        }
    }
}
