package main

import (
	"log"

	"example.com/qms/qmanager"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/utils"
)

func main() {

	qm := qmanager.New()

	app := fiber.New()

	app.Put("/tickets", func(c *fiber.Ctx) error {
		_, calls := qm.CallNext()
		if len(calls) < 5 {
			return c.JSON(calls)
		}
		return c.JSON(calls[:5])
	})

	app.Post("/tickets/:type", func(c *fiber.Ctx) error {
		ticketType := utils.CopyString(c.Params("type"))
		newTicket, err := qm.NewTicket(ticketType)
		if err != nil {
			return fiber.NewError(fiber.StatusUnprocessableEntity, err.Error())
		}
		return c.JSON(newTicket)
	})

	log.Fatal(app.Listen(":4000"))
}
