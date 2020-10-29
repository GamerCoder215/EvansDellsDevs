# Moderation

**?help moderation**

`[] is optional; <> is required`

{% hint style="warning" %}
Most of these commands will require administrator permissions, Such as:  
**—** **Manage Messages  
—** **Ban Members**  
**— Kick Members**  
**— Manage Server**
{% endhint %}

\*\*\*\*

| **Command** | **Usage** |
| :--- | :--- |
| ?ban &lt;user&gt; &lt;reason&gt; | Ban a specified user. |
| ?kick &lt;user&gt; &lt;reason&gt; | Kick a specified user. |
| ?mute &lt;user&gt; &lt;reason&gt; | Prevent a user from talking, in both a text and voice channel. No roles required. |
| ?nick &lt;self\|user&gt; &lt;nickname&gt; | Change the nickname of yourself or someone else. |
| ?purge &lt;messages&gt; \[channel\] | Purge a channel of a certain amount of messages. If no channel specified, will purge the current channel. |
| ?mutechannel &lt;channel&gt; \[duration\] | Prevent anyone from talking in a **text** channel, except those with **Manage Messages** permission and other bots. Choice of a temporary mute. \(Must be in **minutes**\) |
| ?unban &lt;user&gt; | Unbans a banned user. |
| ?unmute &lt;user&gt; | Unmutes a specified user. |
| ?unmutechannel &lt;channel&gt; \[reason\] | Unmute a muted **text** channel. Choice of temporary unmute \(Must be in **minutes**\). |
| ?tempban &lt;user&gt; &lt;duration&gt; &lt;reason&gt; | Temporarily ban a user. Duration must be in **hours**. |
| ?tempmute &lt;user&gt; &lt;duration&gt; &lt;reason&gt; | Temporarily mute a specified user. Duration must be in **minutes**. |
| ?deafen &lt;user&gt; &lt;reason&gt; | Deafen a user in a voice channel. |
| ?undeafen &lt;user&gt; &lt;reason&gt; | Undeafens a user in a voice channel. |

{% hint style="danger" %}
Deafening users **must be in a voice channel**. This may crash the bot and cause it to be unresponsive from time to time.
{% endhint %}

