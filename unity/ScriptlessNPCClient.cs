// Paste this into a C# script in Unity. Set BaseUrl and ApiKey (from the NPC Builder),
// then call SendMessage from your NPC/interaction logic and use the returned content/emotion in your game.
// No UI—only behavior: you decide how to display the response.

using System;
using System.Collections;
using UnityEngine;
using UnityEngine.Networking;

[Serializable]
public class NPCChatResponse
{
    public string id;
    public string npc_id;
    public string content;
    public string emotion;
    public string action;
    public int tokens_used;
}

public class ScriptlessNPCClient : MonoBehaviour
{
    [Tooltip("API base URL, e.g. https://your-app.vercel.app/api/v1")]
    public string baseUrl = "https://your-app.vercel.app/api/v1";

    [Tooltip("API key from the NPC Builder")]
    public string apiKey = "YOUR_API_KEY";

    /// <summary>
    /// Send a message to an NPC and get the response. Call from your NPC/interaction logic.
    /// Use response.content and response.emotion however you want (e.g. show in your dialogue UI).
    /// </summary>
    public void SendMessage(string npcId, string message, Action<NPCChatResponse> onSuccess, Action<string> onError)
    {
        if (string.IsNullOrEmpty(baseUrl) || string.IsNullOrEmpty(apiKey))
        {
            onError?.Invoke("BaseUrl and ApiKey must be set.");
            return;
        }

        StartCoroutine(SendMessageCoroutine(npcId, message, onSuccess, onError));
    }

    private IEnumerator SendMessageCoroutine(string npcId, string message, Action<NPCChatResponse> onSuccess, Action<string> onError)
    {
        string url = baseUrl.TrimEnd('/') + "/chat";
        string body = JsonUtility.ToJson(new ChatRequest { npc_id = npcId, message = message });

        using (UnityWebRequest req = new UnityWebRequest(url, "POST"))
        {
            req.uploadHandler = new UploadHandlerRaw(System.Text.Encoding.UTF8.GetBytes(body));
            req.downloadHandler = new DownloadHandlerBuffer();
            req.SetRequestHeader("Content-Type", "application/json");
            req.SetRequestHeader("Authorization", "Bearer " + apiKey);

            yield return req.SendWebRequest();

            if (req.result != UnityWebRequest.Result.Success)
            {
                onError?.Invoke(req.error + (req.downloadHandler?.text ?? ""));
                yield break;
            }

            try
            {
                NPCChatResponse response = JsonUtility.FromJson<NPCChatResponse>(req.downloadHandler.text);
                onSuccess?.Invoke(response);
            }
            catch (Exception e)
            {
                onError?.Invoke("Parse error: " + e.Message);
            }
        }
    }

    [Serializable]
    private struct ChatRequest
    {
        public string npc_id;
        public string message;
    }
}
