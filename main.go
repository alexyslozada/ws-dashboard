package main

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"gopkg.in/olahol/melody.v1"
)

func main() {
	e := echo.New()
	m := melody.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.Static("/", "./public")
	e.GET("/ws", func(c echo.Context) error {
		m.HandleRequest(c.Response(), c.Request())
		return nil
	})

	m.HandleMessage(func(s *melody.Session, msg []byte) {
		m.Broadcast(msg)
	})

	e.Logger.Fatal(e.Start(":1323"))
}

/*
func WS(c echo.Context) error {
	service := websocket.Handler(func(ws *websocket.Conn) {
		defer ws.Close()
		for {
			// Read
			msg := ""
			err := websocket.Message.Receive(ws, &msg)
			if err == nil {
				fmt.Printf("%s\n", msg)
				// Write
				err = websocket.Message.Send(ws, msg)
				if err != nil {
					c.Logger().Error(err)
				}
			} else {
				c.Logger().Error(err)
			}
		}
	})
	service.ServeHTTP(c.Response(), c.Request())
	return nil
}
*/