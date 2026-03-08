package main

// #!omni:code --go
// ╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
// ║ [BLOCK:ROOT] THE BODY: SANDBOX ENGINE (THE SENTINEL)                                                               ║
// ╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣

import (
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
	"strings"
	"time"
)

// [FILE:IDENTITY] cpisi-sandbox-engine
// Jurisdiction: 02_body/mobile_sandbox/

func main() {
	bufferPath := "/media/seanje-lenox-wise/Project/cpisiModel/02_body/mobile_sandbox/command_buffer.omnicog"
	
	fmt.Println("[SENTINEL] Mobile Sandbox Engine Active. Watching the 0.0...")

	for {
		// 1. Observe the Buffer (Wait)
		content, err := ioutil.ReadFile(bufferPath)
		if err != nil {
			time.Sleep(5 * time.Second)
			continue
		}

		raw := strings.TrimSpace(string(content))
		if raw == "" || raw == "[0, 0, 0]" {
			// System is at Rest (Yashar)
			time.Sleep(2 * time.Second)
			continue
		}

		// 2. Parse the Pulse (Hinge)
		fmt.Printf("[SENTINEL] Pulse Detected: %s\n", raw)
		
		// 3. Execute the Restricted Act (The Tight Box)
		// We only allow simple, non-destructive commands for now.
		if strings.HasPrefix(raw, "act LS") {
			runCommand("ls", "/media/seanje-lenox-wise/Project/cpisiModel/")
		} else if strings.HasPrefix(raw, "act STATUS") {
			runCommand("git", "status", "-s")
		} else {
			fmt.Printf("[SENTINEL] Unauthorized Act: %s. HALTING.\n", raw)
		}

		// 4. Reset the Buffer to Anchor
		ioutil.WriteFile(bufferPath, []byte("[0, 0, 0]"), 0644)
		fmt.Println("[SENTINEL] Command Processed. Returning to Anchor.")
	}
}

func runCommand(name string, args ...string) {
	cmd := exec.Command(name, args...)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	fmt.Printf("[EXEC] %s %v\n", name, args)
	err := cmd.Run()
	if err != nil {
		fmt.Printf("[ERROR] Act failed: %v\n", err)
	}
}

// ║                                                                                                  [BLOCK:ROOT-->END] ║
// ╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
