namespace DiveInColorsWebAPIForReactModule.Controllers.Model
{
    public class Feedback
    {
        public int ID { get; set; }
        public string? ArtistName { get; set; }
        public string? FeedbackComments { get; set; }

        public int IsDigitalArtwork { get; set; }
    }
}
