﻿// <auto-generated />
using DiveInColorsWebAPIForReactModule.Controllers.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DiveInColorsWebAPIForReactModule.Migrations
{
    [DbContext(typeof(FeedbackContext))]
    [Migration("20230306112450_addFeedbackToDb")]
    partial class addFeedbackToDb
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("DiveInColorsWebAPIForReactModule.Controllers.Model.Feedback", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("ArtistName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FeedbackComments")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("IsDigitalArtwork")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.ToTable("Feedbacks");
                });
#pragma warning restore 612, 618
        }
    }
}
