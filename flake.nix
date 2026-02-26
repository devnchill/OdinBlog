{
  description = "devshell for OdinBlog. installs yarn";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs =
    { self, nixpkgs }:

    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      devShells.x86_64-linux.default = pkgs.mkShell {
        nativeBuildInputs = with pkgs; [
          yarn-berry

          nil
          nixfmt

          vscode-json-languageserver

          prettier
          typescript-language-server
          vscode-css-languageserver
          tailwindcss-language-server

        ];
      };
    };
}
