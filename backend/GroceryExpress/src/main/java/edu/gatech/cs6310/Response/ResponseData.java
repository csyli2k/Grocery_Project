package edu.gatech.cs6310.Response;

public class ResponseData<T> {
    public static <T> ResponseData<T> create(T data) {
        return new ResponseData<>(data);
    }

    public static <T> ResponseData<T> create(ResponseType responseType) {
        return new ResponseData<>(responseType);
    }

    private T data;
    private ResponseType responseType;

    public ResponseType getResponseType() {
        return responseType;
    }

    public ResponseData(T data) {
        this.data = data;
    }

    public ResponseData(ResponseType responseType) {
        this.responseType = responseType;
    }


    public T getData() {
        return data;
    }


}
