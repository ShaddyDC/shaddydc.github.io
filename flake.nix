{
  description = "Yomi-Dict is a yomidict dictionary reader";

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";

    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem
      (system:
        let
          pkgs = import nixpkgs { inherit system; };
          buildInputs = with pkgs; [
            hugo
          ];
        in
        with pkgs;
        {
          devShells.default = stdenv.mkDerivation {
            buildInputs = buildInputs;
            name = "hugo env";
          };
        }
      );
}
