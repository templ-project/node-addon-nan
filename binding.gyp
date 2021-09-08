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
    }
  ]
}
