#ifndef BUILDING_NODE_EXTENSION
#define BUILDING_NODE_EXTENSION
#endif

#define if_unmet_nan_throw(call, thrower, error)                               \
  if (!(call)) {                                                               \
    thrower(error);                                                            \
  }

#include <nan.h>
#include <node.h>
#include <v8.h>

void Hello(const Nan::FunctionCallbackInfo<v8::Value>& info) {
  v8::Isolate* isolate = info.GetIsolate();
  v8::Local<v8::Context> context = isolate->GetCurrentContext();
  v8::Local<v8::String> who;

  if (info.Length() < 1) {
    if_unmet_nan_throw(
        Nan::New("World").ToLocal(&who), Nan::ThrowError, "unable to allocate");
  } else {
    if (!info[0]->IsString()) {
      Nan::ThrowTypeError("Wrong arguments");
    }
    if_unmet_nan_throw(info[0]->ToString(context).ToLocal(&who),
                       Nan::ThrowRangeError,
                       "could not read arguments");
  }

  v8::Local<v8::String> hello;
  if_unmet_nan_throw(Nan::New("Hello ").ToLocal(&hello),
                     Nan::ThrowError,
                     "unable to allocate");

  v8::Local<v8::String> em;
  if_unmet_nan_throw(
      Nan::New("!").ToLocal(&em), Nan::ThrowError, "unable to allocate");

  hello = v8::String::Concat(isolate, hello, who);
  hello = v8::String::Concat(isolate, hello, em);

  info.GetReturnValue().Set(hello);
}

void Init(v8::Local<v8::Object> exports) {
  v8::Local<v8::Context> context = exports->CreationContext();
  bool hasConverted = true;
  if_unmet_nan_throw(exports
                         ->Set(context,
                               Nan::New("hello").ToLocalChecked(),
                               Nan::New<v8::FunctionTemplate>(Hello)
                                   ->GetFunction(context)
                                   .ToLocalChecked())
                         .To(&hasConverted),
                     Nan::ThrowError,
                     "unable to determine the map of 'hello' method");
  if_unmet_nan_throw(
      hasConverted, Nan::ThrowError, "unable to map 'hello' method")
}

NODE_MODULE(hello, Init)
