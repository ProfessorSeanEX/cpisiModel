// #!omni:code --rust
// [BLOCK:ROOT] THE GAME: CLI NATIVE ENTRYPOINT
// ==============================================================================

pub mod primitives;
pub mod kernel;
pub mod interface;

use crate::interface::CLI;

fn main() {
    let mut app = CLI::new();
    app.run();
}
