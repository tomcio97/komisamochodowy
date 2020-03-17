using Microsoft.EntityFrameworkCore.Migrations;

namespace KomisSamochodowy.Migrations
{
    public partial class Edited : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Values",
                newName: "year");

            migrationBuilder.AddColumn<string>(
                name: "EngineCapacity",
                table: "Values",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Mark",
                table: "Values",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Model",
                table: "Values",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EngineCapacity",
                table: "Values");

            migrationBuilder.DropColumn(
                name: "Mark",
                table: "Values");

            migrationBuilder.DropColumn(
                name: "Model",
                table: "Values");

            migrationBuilder.RenameColumn(
                name: "year",
                table: "Values",
                newName: "Name");
        }
    }
}
