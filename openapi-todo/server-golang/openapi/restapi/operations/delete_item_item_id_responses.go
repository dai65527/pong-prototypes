// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"github.com/dai65527/pong-prototypes/openapi-todo/server-golang/openapi/models"
)

// DeleteItemItemIDOKCode is the HTTP code returned for type DeleteItemItemIDOK
const DeleteItemItemIDOKCode int = 200

/*DeleteItemItemIDOK OK

swagger:response deleteItemItemIdOK
*/
type DeleteItemItemIDOK struct {

	/*
	  In: Body
	*/
	Payload interface{} `json:"body,omitempty"`
}

// NewDeleteItemItemIDOK creates DeleteItemItemIDOK with default headers values
func NewDeleteItemItemIDOK() *DeleteItemItemIDOK {

	return &DeleteItemItemIDOK{}
}

// WithPayload adds the payload to the delete item item Id o k response
func (o *DeleteItemItemIDOK) WithPayload(payload interface{}) *DeleteItemItemIDOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the delete item item Id o k response
func (o *DeleteItemItemIDOK) SetPayload(payload interface{}) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *DeleteItemItemIDOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	payload := o.Payload
	if err := producer.Produce(rw, payload); err != nil {
		panic(err) // let the recovery middleware deal with this
	}
}

// DeleteItemItemIDBadRequestCode is the HTTP code returned for type DeleteItemItemIDBadRequest
const DeleteItemItemIDBadRequestCode int = 400

/*DeleteItemItemIDBadRequest Bad Request

swagger:response deleteItemItemIdBadRequest
*/
type DeleteItemItemIDBadRequest struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewDeleteItemItemIDBadRequest creates DeleteItemItemIDBadRequest with default headers values
func NewDeleteItemItemIDBadRequest() *DeleteItemItemIDBadRequest {

	return &DeleteItemItemIDBadRequest{}
}

// WithPayload adds the payload to the delete item item Id bad request response
func (o *DeleteItemItemIDBadRequest) WithPayload(payload *models.Error) *DeleteItemItemIDBadRequest {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the delete item item Id bad request response
func (o *DeleteItemItemIDBadRequest) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *DeleteItemItemIDBadRequest) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(400)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// DeleteItemItemIDNotFoundCode is the HTTP code returned for type DeleteItemItemIDNotFound
const DeleteItemItemIDNotFoundCode int = 404

/*DeleteItemItemIDNotFound Not Found

swagger:response deleteItemItemIdNotFound
*/
type DeleteItemItemIDNotFound struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewDeleteItemItemIDNotFound creates DeleteItemItemIDNotFound with default headers values
func NewDeleteItemItemIDNotFound() *DeleteItemItemIDNotFound {

	return &DeleteItemItemIDNotFound{}
}

// WithPayload adds the payload to the delete item item Id not found response
func (o *DeleteItemItemIDNotFound) WithPayload(payload *models.Error) *DeleteItemItemIDNotFound {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the delete item item Id not found response
func (o *DeleteItemItemIDNotFound) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *DeleteItemItemIDNotFound) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(404)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// DeleteItemItemIDInternalServerErrorCode is the HTTP code returned for type DeleteItemItemIDInternalServerError
const DeleteItemItemIDInternalServerErrorCode int = 500

/*DeleteItemItemIDInternalServerError Internal Server Error

swagger:response deleteItemItemIdInternalServerError
*/
type DeleteItemItemIDInternalServerError struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewDeleteItemItemIDInternalServerError creates DeleteItemItemIDInternalServerError with default headers values
func NewDeleteItemItemIDInternalServerError() *DeleteItemItemIDInternalServerError {

	return &DeleteItemItemIDInternalServerError{}
}

// WithPayload adds the payload to the delete item item Id internal server error response
func (o *DeleteItemItemIDInternalServerError) WithPayload(payload *models.Error) *DeleteItemItemIDInternalServerError {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the delete item item Id internal server error response
func (o *DeleteItemItemIDInternalServerError) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *DeleteItemItemIDInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(500)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
