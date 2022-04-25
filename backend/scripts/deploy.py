from brownie import accounts, network, Profile, Body, Head, Face, Accessory, chain, config
import random
import json

LOCAL_BLOCKCHAIN_ENVIRONMENTS = ["hardhat", "development", "ganache", "mainnet-fork"]


def deploy_and_create(accounts, use_previous=None):
    previous = json.load(open('previous.json'))
    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        publish_source = False
        cur_network = 'local'
        accounts = accounts[:10]
        account = accounts[0]
    else:
        publish_source = True
        cur_network = network.show_active()
        accounts.load("main")
        account = accounts[0]

    if(use_previous):
        body = Body.at(previous[cur_network]['body'])
        head = Head.at(previous[cur_network]['head'])
        face = Face.at(previous[cur_network]['face'])
        accessory = Accessory.at(previous[cur_network]['accessory'])
        profile = Profile.at(previous[cur_network]['profile'])
    else:
        body = Body.deploy({"from": account}, publish_source=publish_source)
        head = Head.deploy({"from": account}, publish_source=publish_source)
        face = Face.deploy({"from": account}, publish_source=publish_source)
        accessory = Accessory.deploy({"from": account}, publish_source=publish_source)
        profile = Profile.deploy({"from": account}, publish_source=publish_source)

        profile.setFeaturesAddress([body.address, head.address, face.address, accessory.address])

    if cur_network not in previous:
        previous[cur_network] = {}

    previous[cur_network] = {
        'profile': profile.address, 'body': body.address,
        'head': head.address, 'face': face.address,
        'accessory': accessory.address
    }

    json.dump(previous, open('previous.json', 'w'))

    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        account = accounts[1]

    profile.setSaleIsActive(True, {"from": accounts[0]})

    tx = profile.mintProfile(5, {"from": accounts[0], "value": "0.25 ether"})
    tx.wait(1)
    tx = profile.mintProfile(2, {"from": accounts[1], "value": "0.1 ether"})
    tx.wait(1)

    print(profile)

    return profile


def main(use_previous=None):
    deploy_and_create(accounts, use_previous)
