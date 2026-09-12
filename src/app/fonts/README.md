# Open Runde

A rounded cut of Inter, written by Laurids Kern as a replacement for SF Pro
Rounded, and released under the SIL Open Font License. Unlike SF Pro, it can
be embedded in a website.

Source: https://github.com/lauridskern/open-runde
Licence: `OFL.txt` in this folder, which the OFL requires to travel with the
font files.

The `.woff2` files here are subsets, not the originals. Each weight ships as
two files split by unicode-range: Latin at about 27 KB and Cyrillic at about
22 KB, against 150 KB for the full face. Three weights, 400, 500 and 600.

To rebuild them from the originals in the Grit app:

```
pyftsubset OpenRunde-<Cut>.otf \
  --output-file=OpenRunde-<Cut>-latin.woff2 --flavor=woff2 \
  --layout-features='*' --unicodes="<the latin range in RootShell.tsx>"
```

The Cyrillic file is the same command with the other range. Both ranges are
written out in `src/components/RootShell.tsx`, next to the loaders.
