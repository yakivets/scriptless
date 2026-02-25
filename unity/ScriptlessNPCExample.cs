// Minimal example: call the NPC client and use the response (e.g. log or assign to your own UI).
// Attach this to a GameObject; assign the same ScriptlessNPCClient reference.
// Use response.content and response.emotion in your game however you like.

using UnityEngine;

public class ScriptlessNPCExample : MonoBehaviour
{
    public ScriptlessNPCClient client;
    public string npcId = "uncle-marco";

    [Tooltip("Optional: assign a field to show the last response content in the Inspector")]
    public string lastResponseContent;

    public void OnPlayerSentMessage(string playerMessage)
    {
        if (client == null)
        {
            Debug.LogError("ScriptlessNPCExample: Assign the ScriptlessNPCClient reference.");
            return;
        }

        client.SendMessage(
            npcId,
            playerMessage,
            onSuccess: (response) =>
            {
                lastResponseContent = response.content;
                Debug.Log($"NPC said: {response.content} (emotion: {response.emotion})");
                // Use response.content and response.emotion in your dialogue UI here.
            },
            onError: (error) => Debug.LogError("NPC error: " + error)
        );
    }
}
