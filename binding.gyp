{
    "targets": [
      {
        "target_name": "ot",
        "cflags!": [ "-fno-exceptions", "-fno-rtti" ],
        "cflags_cc!": [ "-fno-exceptions", "-fno-rtti", "-std=c++11" ],
        "sources": [ "./server/ot-addon/init.cpp", "./server/ot-addon/operation.cpp" ],
        "include_dirs": [
          "<!@(node -p \"require('node-addon-api').include\")"
        ],
        'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
      }
    ]
}
