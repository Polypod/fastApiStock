import * as digitalocean from "@pulumi/digitalocean";
import * as tls from "@pulumi/tls";
import * as docker from "@pulumi/docker";

const privateKey = new tls.PrivateKey("my-private-key", {
    algorithm: "RSA",
});

const sshKey = new digitalocean.SshKey("my-ssh-key", {
    publicKey: privateKey.publicKeyOpenssh,
});

 const web = new digitalocean.Droplet("web", {
     image: "ubuntu-18-04-x64",
     region: digitalocean.Region.NYC3,
     size: digitalocean.DropletSlug.DropletS1VCPU1GB,
     sshKeys: [sshKey.id],
 });

 // Install docker
const image = new docker.RemoteImage("ubuntu", {
  name: "ubuntu:precise"
});

const container = new docker.Container("ubuntu", {
  image: image.latest,
});

 export let ipAddress = web.ipv4Address;
 export let status = web.status;