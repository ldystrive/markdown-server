#include <napi.h>
#include <string>
#include <iostream>

#include "operation.h"

using namespace std;

Operation *operation;

Napi::String toString(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  return Napi::String::New(env, operation->toString());
}

void addInsert(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  
  if(info.Length() < 1) {
    Napi::TypeError::New(env, "Wrong number of arguments")
      .ThrowAsJavaScriptException();
    return;
  }

  if(!info[0].IsString()) {
    Napi::TypeError::New(env, "Wrong arguments")
      .ThrowAsJavaScriptException();
    return;
  }
  
  string str = info[0].As<Napi::String>().Utf8Value();
  operation->addInsert(str);
  return;
}


Napi::String Method(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  return Napi::String::New(env, "world");
}



Napi::Object Init(Napi::Env env, Napi::Object exports) {
  
  operation = new Operation();

  exports.Set(Napi::String::New(env, "hello"),
              Napi::Function::New(env, Method));
  exports.Set(Napi::String::New(env, "toString"),
              Napi::Function::New(env, toString));
  exports.Set(Napi::String::New(env, "addInsert"),
              Napi::Function::New(env, addInsert));              
  
  return exports;
}

NODE_API_MODULE(hello, Init)
