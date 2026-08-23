/**
 * The /uses page. Product names are proper nouns and stay as they are in every
 * language; the group headings and the short notes are translated, keyed by id.
 */
export interface UseItem {
  id: string;
  name: string;
  /** Linked when the thing has a home worth visiting. */
  url?: string;
}

export interface UseGroup {
  id: string;
  items: UseItem[];
}

export const USES: UseGroup[] = [
  {
    id: "machine",
    items: [
      { id: "cpu", name: "AMD Ryzen 7 7800X3D" },
      { id: "gpu", name: "NVIDIA GeForce RTX 5070, 12 GB" },
      { id: "ram", name: "32 GB" },
      { id: "disk", name: "2x NVMe" },
    ],
  },
  {
    id: "desktop",
    items: [
      { id: "os", name: "Arch Linux", url: "https://archlinux.org" },
      { id: "wm", name: "Hyprland", url: "https://hypr.land" },
      {
        id: "dots",
        name: "end-4/dots-hyprland",
        url: "https://github.com/end-4/dots-hyprland",
      },
      {
        id: "panel",
        name: "Grit panel",
        url: "https://github.com/adilzhanY/grit",
      },
      {
        id: "dictation",
        name: "OpenHyprWhisper",
        url: "https://github.com/adilzhanY/OpenHyprWhisper",
      },
      { id: "launcher", name: "fuzzel" },
      { id: "lock", name: "hyprlock" },
    ],
  },
  {
    id: "editor",
    items: [
      { id: "nvim", name: "Neovim", url: "https://neovim.io" },
      { id: "vscode", name: "VS Code" },
    ],
  },
  {
    id: "terminal",
    items: [
      { id: "kitty", name: "kitty", url: "https://sw.kovidgoyal.net/kitty/" },
      { id: "fish", name: "fish", url: "https://fishshell.com" },
      { id: "atuin", name: "Atuin", url: "https://atuin.sh" },
      { id: "btop", name: "btop" },
      { id: "gh", name: "GitHub CLI", url: "https://cli.github.com" },
    ],
  },
  {
    id: "everyday",
    items: [
      { id: "brave", name: "Brave" },
      { id: "espanso", name: "espanso", url: "https://espanso.org" },
      { id: "onepassword", name: "1Password" },
      {
        id: "font",
        name: "JetBrainsMono Nerd Font",
        url: "https://www.nerdfonts.com",
      },
    ],
  },
];
