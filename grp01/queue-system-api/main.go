package main

import (
	"log"

	"example.com/qms/qmanager"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/utils"
)

func main() {

	qm := qmanager.New()

	app := fiber.New()

	app.Use(cors.New())

	app.Put("/tickets", func(c *fiber.Ctx) error {
		ticket := qm.CallNext()
		if ticket == nil {
			return c.SendStatus(fiber.StatusNoContent)
		}
		return c.JSON(ticket)
	})

	app.Post("/tickets/:type", func(c *fiber.Ctx) error {
		ticketType := utils.CopyString(c.Params("type"))
		newTicket, err := qm.NewTicket(ticketType)
		if err != nil {
			return fiber.NewError(fiber.StatusUnprocessableEntity, err.Error())
		}
		return c.JSON(newTicket)
	})

	app.Get("/tickets", func(c *fiber.Ctx) error {
		size := c.QueryInt("size", 5)
		return c.JSON(qm.LastCalls(size))
	})

	log.Fatal(app.Listen(":8000"))
}
