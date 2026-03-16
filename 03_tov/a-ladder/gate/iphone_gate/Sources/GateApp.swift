import SwiftUI
import Combine

class GateSync: ObservableObject {
    @Published var rawDownload: String = "Waiting for Revelation..."
    @Published var structuredWord: String = "Awaiting Distillation..."
    @Published var connectionStatus: String = "OFFLINE"
    
    private var webSocketTask: URLSessionWebSocketTask?
    private let url = URL(string: "ws://your-workstation-ip:8080/gate")!
    
    init() {
        connect()
    }
    
    func connect() {
        webSocketTask = URLSession.shared.webSocketTask(with: url)
        webSocketTask?.resume()
        receiveMessage()
        connectionStatus = "0.0 YASHAR"
    }
    
    func receiveMessage() {
        webSocketTask?.receive { [weak self] result in
            switch result {
            case .success(let message):
                switch message {
                case .string(let text):
                    self?.handleIncomingData(text)
                default: break
                }
                self?.receiveMessage()
            case .failure:
                self?.connectionStatus = "DISCONNECTED"
            }
        }
    }
    
    private func handleIncomingData(_ text: String) {
        // Simple logic to route data based on prefix
        DispatchQueue.main.async {
            if text.hasPrefix("VOID:") {
                self.rawDownload = String(text.dropFirst(5))
            } else if text.hasPrefix("WORD:") {
                self.structuredWord = String(text.dropFirst(5))
            }
        }
    }
    
    func signTurn(_ value: Int) {
        let message = URLSessionWebSocketTask.Message.string("SIGN:\(value)")
        webSocketTask?.send(message) { error in
            if let error = error { print("Sign error: \(error)") }
        }
    }
}

struct GateView: View {
    @StateObject private var sync = GateSync()
    @State private var sealValue: Double = 0.0
    
    private let l_4: CGFloat = 4.0
    private let l_8: CGFloat = 8.0
    private let l_12: CGFloat = 12.0

    var body: some View {
        ZStack {
            Color.black.edgesIgnoringSafeArea(.all)
            
            VStack(spacing: 0) {
                // MARK: HEADER
                HStack {
                    Text("#!omni:gate")
                        .font(.system(.caption, design: .monospaced))
                        .foregroundColor(.green)
                    Spacer()
                    Text(sync.connectionStatus)
                        .font(.system(.caption, design: .monospaced))
                        .foregroundColor(sync.connectionStatus == "0.0 YASHAR" ? .green : .red)
                }
                .padding(.horizontal, l_12)
                .padding(.top, l_8)
                
                // MARK: TRIPTYCH
                GeometryReader { geo in
                    HStack(spacing: 0) {
                        ScrollView {
                            VStack(alignment: .leading) {
                                Text("// VOID")
                                    .font(.system(.footnote, design: .monospaced))
                                    .foregroundColor(.red)
                                Text(sync.rawDownload)
                                    .font(.system(.body, design: .monospaced))
                                    .foregroundColor(.white)
                            }
                            .padding(l_12)
                        }
                        .frame(width: geo.size.width * 0.45)
                        .background(Color(white: 0.05))
                        
                        Divider().background(Color.gray)
                        
                        ScrollView {
                            VStack(alignment: .leading) {
                                Text("// WORD")
                                    .font(.system(.footnote, design: .monospaced))
                                    .foregroundColor(.blue)
                                Text(sync.structuredWord)
                                    .font(.system(.body, design: .monospaced))
                                    .foregroundColor(.white)
                            }
                            .padding(l_12)
                        }
                        .frame(width: geo.size.width * 0.55)
                    }
                }
                
                // MARK: THE SEAL
                VStack(spacing: l_12) {
                    HStack {
                        Text("NAY")
                        Spacer()
                        Text("YASHAR")
                        Spacer()
                        Text("YEA")
                    }
                    .font(.system(.caption, design: .monospaced))
                    .foregroundColor(.gray)
                    
                    Slider(value: $sealValue, in: -1...1, step: 1)
                        .accentColor(sealColor)
                        .padding(.horizontal, l_12)
                        .onChange(of: sealValue) { newValue in
                            hapticFeedback()
                            sync.signTurn(Int(newValue))
                        }
                    
                    Text("[ SEAL THE TURN ]")
                        .font(.system(.headline, design: .monospaced))
                        .foregroundColor(sealValue == 1.0 ? .blue : .gray)
                        .padding(.bottom, l_8)
                }
                .padding(l_12)
                .background(Color(white: 0.05))
            }
        }
    }
    
    private var sealColor: Color {
        if sealValue < -0.5 { return .red }
        if sealValue > 0.5 { return .blue }
        return .green
    }
    
    private func hapticFeedback() {
        let impact = UIImpactFeedbackGenerator(style: .heavy)
        impact.impactOccurred()
    }
}

@main
struct GateApp: App {
    var body: some Scene {
        WindowGroup {
            GateView()
        }
    }
}

