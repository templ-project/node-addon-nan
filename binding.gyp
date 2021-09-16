{
  "targets": [
    {
      "target_name": "main",
      "sources": [
        "src/main.cc"
      ],
      "link_settings": {},
      "include_dirs": [
        "<!(node -e \"require('nan')\")"
      ],
      "cflags_cc": [
        "-std=c++11"
      ],
      "cflags_cc!": [
        "-std=gnu++1y"
      ]
    }
  ]
}
