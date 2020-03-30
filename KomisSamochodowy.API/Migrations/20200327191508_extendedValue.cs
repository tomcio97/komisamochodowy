using Microsoft.EntityFrameworkCore.Migrations;

namespace KomisSamochodowy.Migrations
{
    public partial class extendedValue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "color",
                table: "Values",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "describe",
                table: "Values",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "fuelType",
                table: "Values",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "mileage",
                table: "Values",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "numberOfDoors",
                table: "Values",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "price",
                table: "Values",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "color",
                table: "Values");

            migrationBuilder.DropColumn(
                name: "describe",
                table: "Values");

            migrationBuilder.DropColumn(
                name: "fuelType",
                table: "Values");

            migrationBuilder.DropColumn(
                name: "mileage",
                table: "Values");

            migrationBuilder.DropColumn(
                name: "numberOfDoors",
                table: "Values");

            migrationBuilder.DropColumn(
                name: "price",
                table: "Values");
        }
    }
}
