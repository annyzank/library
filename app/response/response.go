package response

type Response struct {
	Status  bool
	ErrText string
	Data    interface{}
}

func Success(data interface{}) Response {
	return Response{true, "", data}
}

func Fail(text string) Response {
	return Response{false, text, nil}
}
