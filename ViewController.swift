//
//  ViewController.swift
//  LocBlairUpdater
//
//  Created by Beza Ketema on 4/20/24.
//

import Foundation
import SwiftUI
import UIKit

struct RootViewControllerContainer: View {
    var body: some View {
        ViewControllerRepresentable()
    }
}

struct ViewControllerRepresentable: UIViewControllerRepresentable {
    func makeUIViewController(context: Context) -> ViewController {
        return ViewController()
    }

    func updateUIViewController(_ uiViewController: ViewController, context: Context) {
        // Update the view controller if needed
    }
}

class ViewController: UIViewController {
    let button = UIButton()

    override func viewDidLoad() {
        super.viewDidLoad()

        // Set up button
        button.frame = CGRect(x: 50, y: 200, width: 200, height: 50)
        button.setTitle("Display Text", for: .normal)
        button.setTitleColor(.white, for: .normal)
        button.backgroundColor = .blue
        button.addTarget(self, action: #selector(buttonPressed), for: .touchUpInside)
        self.view.addSubview(button)
    }

    @objc func buttonPressed() {
        // Display ContentView when the button is pressed
        let contentView = ContentView()
        let hostingController = UIHostingController(rootView: contentView)
        self.present(hostingController, animated: true, completion: nil)
    }
}
