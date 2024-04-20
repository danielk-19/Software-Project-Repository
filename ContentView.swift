//
//  ContentView.swift
//  LocBlairUpdater
//
//  Created by Beza Ketema on 4/20/24.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundColor(.blue) // Changed to foregroundColor
            Text("Hello, world! + \(getObj(input: 5))")
        }
        .padding()
    }
    
    func getObj(input: Int) -> Int {
        if input <= 1 {
            return 1
        }
        return input * getObj(input: input - 1)
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
