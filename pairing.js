// Function to generate a WhatsApp pairing link
const generatePairLink = async (client, m, text) => {
  try {
    let args = text.split(" ");
    if (args.length < 1) {
      return m.reply("❌ Please provide a client's WhatsApp number. Example: `.pair 254741388986`");
    }

    let clientNumber = args[0].trim();

    // Fetch the pair code from the pairing link API
    let response = await fetch(`https://mzazi-xmd-cjp7.onrender.com/generate?number=${clientNumber}`);
    let data = await response.json();

    if (!data.success) {
      return m.reply("⚠️ Failed to generate pair code. Try again.");
    }

    let pairCode = data.pairCode;
    let pairLink = `https://mzazi-xmd-cjp7.onrender.com/pair?code=${pairCode}&number=${clientNumber}`;

    let message = `🔗 *Pairing Link Generated:*\n📌 Client: ${clientNumber}\n🔑 Code: ${pairCode}\n🌍 Link: ${pairLink}`;

    await client.sendMessage(m.chat, { text: message });
  } catch (error) {
    console.error("Error in generatePairLink:", error);
    m.reply("⚠️ An error occurred while generating the pairing link.");
  }
};

// Export the function
module.exports = { generatePairLink };
